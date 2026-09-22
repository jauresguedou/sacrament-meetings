'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import {
	addMeeting,
	deleteMeeting as deleteMeetingFromDb,
	updateMeeting as updateMeetingInDb,
} from './meetings-db';
import type { State } from './types';

const jsonValue = (value: unknown) => {
	if (typeof value !== 'string') {
		return value;
	}

	try {
		return JSON.parse(value);
	} catch {
		return value;
	}
};

const hymnSchema = z.object({
	number: z.coerce.number().int().nonnegative(),
	title: z.string().trim().min(1),
});

const speakerSchema = z.object({
	name: z.string().trim().min(1),
	topic: z.string(),
	type: z.enum(['speaker', 'musical-number']),
});

const wardBusinessSchema = z.object({
	description: z.string().trim().min(1),
});

const jsonHymnSchema = z.preprocess(jsonValue, hymnSchema);
const jsonSpeakersSchema = z.preprocess(jsonValue, z.array(speakerSchema));
const jsonWardBusinessSchema = z.preprocess(jsonValue, z.array(wardBusinessSchema));
const jsonAnnouncementsSchema = z.preprocess(jsonValue, z.array(z.string()));

const stakeBusinessSchema = z.preprocess(
	(value) => value === 'true' || value === 'on' || value === true,
	z.boolean(),
);

const MeetingFormSchema = z.object({
	date: z.string().date(),
	meetingType: z.enum(['testimony', 'regular', 'stake', 'general']),
	presiding: z.string().trim().min(1),
	conducting: z.string(),
	announcements: jsonAnnouncementsSchema.default([]),
	openingHymn: jsonHymnSchema,
	openingPrayer: z.string(),
	wardBusiness: jsonWardBusinessSchema,
	stakeBusiness: stakeBusinessSchema,
	sacramentHymn: jsonHymnSchema,
	speakers: jsonSpeakersSchema,
	closingHymn: jsonHymnSchema,
	closingPrayer: z.string(),
});

const MeetingUpdateFormSchema = MeetingFormSchema.partial();

function formDataValues(formData: FormData) {
	return Object.fromEntries(formData.entries());
}

function validationState(error: z.ZodError): State {
	const fieldErrors = error.flatten().fieldErrors as Record<string, string[] | undefined>;
	return {
		message: 'Please correct the highlighted fields.',
		errors: Object.fromEntries(
			Object.entries(fieldErrors).filter(([, messages]) => messages && messages.length > 0),
		) as Record<string, string[]>,
	};
}

export async function createMeeting(
	_previousState: State,
	formData: FormData,
	): Promise<State> {
	const result = MeetingFormSchema.safeParse(formDataValues(formData));
	if (!result.success) {
		return validationState(result.error);
	}

	try {
		await addMeeting(result.data);
	} catch (error) {
		console.error('createMeeting failed:', error);
		return { message: 'Unable to create the meeting. Please try again.' };
	}

	revalidatePath('/meetings');
	redirect('/meetings');
}

export async function updateMeeting(
	id: number,
	_previousState: State,
	formData: FormData,
	): Promise<State> {
	const result = MeetingUpdateFormSchema.safeParse(formDataValues(formData));
	if (!result.success) {
		return validationState(result.error);
	}

	let meeting;
	try {
		meeting = await updateMeetingInDb(id, result.data);
	} catch (error) {
		console.error('updateMeeting failed:', error);
		return { message: 'Unable to update the meeting. Please try again.' };
	}

	if (!meeting) {
		return { message: `No meeting found for ID ${id}.` };
	}

	revalidatePath('/meetings');
	redirect('/meetings');
}

export async function deleteMeeting(id: number): Promise<void> {
	let deleted;
	try {
		deleted = await deleteMeetingFromDb(id);
	} catch (error) {
		console.error('deleteMeeting failed:', error);
		throw new Error('Unable to delete the meeting. Please try again.');
	}

	if (!deleted) {
		throw new Error(`No meeting found for ID ${id}.`);
	}

	revalidatePath('/meetings');
	redirect('/meetings');
}
