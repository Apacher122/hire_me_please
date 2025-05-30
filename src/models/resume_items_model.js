import { z } from 'zod';

export const experienceResponse = z.object({
    experiences: z.array(
        z.object({
            position: z.string(),
            company: z.string(),
            start: z.string(),
            end: z.string(),
            description: z.array(
                z.object({
                    text: z.string(),
                    justification_for_change: z.string(),
                    is_new_suggestion: z.boolean(),
                })
            ),
        })
    ),
});

export const skillsResponse = z.object({
    skills: z.array(
        z.object({
            category: z.string(),
            skill: z.array(
                z.object({
                    item: z.string()
                })
            ),
            justification_for_changes: z.string(),
        })
    ),
});

export const projectsResponse = z.object({
    projects: z.array(
        z.object({
            name: z.string(),
            role: z.string(),
            status: z.string(),
            description: z.array(
                z.object({
                    text: z.string(),
                    justification_for_change: z.string(),
                    is_new_suggestion: z.boolean(),
                })
            ),
        })
    ),
});

export const resumeItems = z.object({
    experiences: experienceResponse.shape.experiences,
    skills: skillsResponse.shape.skills,
    projects: projectsResponse.shape.projects,
});

export const resumeItemsResponse = z.union([
    experienceResponse,
    skillsResponse,
    projectsResponse,
]);
// This union allows the response to be one of the three types, which is useful for handling different sections of a resume.