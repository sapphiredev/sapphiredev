import { Octokit } from '@octokit/core';
import type { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods';
import { RequestError } from '@octokit/request-error';
import { OctokitRequestHeaders } from '../constants.js';

/**
 * Retrieves the URL for downloading the job logs for a specific workflow run.
 *
 * @param octokit - The Octokit instance.
 * @param owner - The owner of the repository.
 * @param repo - The name of the repository.
 * @param jobId - The ID of the job.
 * @returns The URL for downloading the job logs.
 * @throws If an error occurs while retrieving the job logs.
 */
export async function getJobLogs(octokit: Octokit & ReturnType<typeof restEndpointMethods>, owner: string, repo: string, jobId: number) {
	try {
		const jobLogsData = await octokit.rest.actions.downloadJobLogsForWorkflowRun({
			owner,
			repo,
			job_id: jobId,
			headers: OctokitRequestHeaders
		});

		return jobLogsData.url;
	} catch (error) {
		// If the error is a RequestError then the url for the logs is on the response anyway
		if (error instanceof RequestError) {
			return error.response?.url;
		}

		throw error;
	}
}
