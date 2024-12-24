"use server";

import { auth } from "@/app/auth";
import type { onBoardingShemaType } from "@/components/onboarding/onboarding_form";
import prisma from "@/db/prisma";
import { put } from "@vercel/blob";

export async function completeOnboarding(
	values: onBoardingShemaType,
	avatar: File,
	cv?: File,
) {
	const session = await auth();
	if (!session?.user?.id) {
		return { success: false, message: "Not authenticated" };
	}

	// Upload files if they exist
	let avatarUrl: string | undefined;
	let cvUrl: string | undefined;
	if (avatar) {
		const avatarBlob = await put(`avatars/${avatar.name}`, avatar, {
			access: "public",
			addRandomSuffix: true,
		});
		avatarUrl = avatarBlob.url;
	}

	if (cv && cv !== null) {
		const cvBlob = await put(`cvs/${cv.name}`, cv, {
			access: "public",
			addRandomSuffix: true,
		});
		cvUrl = cvBlob.url;
	}

	// Update user profile
	const updatedUser = await prisma.user.update({
		where: { id: session.user.id },
		data: {
			name: values.name,
			github: values.github,
			portfolio: values.portfolio,
			phone: values.phone,
			bio: values.bio,
			role: values.role,
			image: avatarUrl || session.user.image,
			cvPath: cvUrl,
			onboardingCompleted: true,
			skills: {
				deleteMany: {},
				createMany: {
					data: values.skills.map((skill) => ({ skill })),
				},
			},
		},
    include: {
      skills: true
    }
	});

	return { success: true, message: "Profile completed successfully" };
}
