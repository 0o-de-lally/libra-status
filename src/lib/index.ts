// place files you want to import through the `$lib` alias in this folder.
import { maybeInitClient } from 'libra-reports/src/makeClient';
import { ReportValidator } from 'libra-reports/src/reports/validators';

export const refreshValidator = async (): Promise<ReportValidator> => {
	let client = await maybeInitClient();
	let rv = new ReportValidator();
	await rv.populateAll(client);
	return rv;
};
