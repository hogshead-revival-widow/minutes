import * as yup from 'yup';

const email = yup.string().email();
const uuid = yup.string().uuid();
const title = yup
	.string()
	.required('Bitte Titel angeben')
	.max(150, 'Bitte kürzeren Titel wählen (max. 150 Zeichen)');
const description = yup.string().nullable();
const contact = yup.string().required('Bitte Email angeben').email('Das ist keine Email');
const date = yup
	.date()
	.max(new Date(), 'Datum muss in der Vergangenheit liegen')
	.typeError('Bitte Datum angeben');
const time = yup
	.string()
	.nullable()
	.test('is-valid', 'Bitte Zeit vollständig (z.B. 23:12) eingeben', (value) =>
		value === '' || value === null ? true : value.includes(':') && value.length >= 5
	)
	.test('is-past', 'Zeit muss in der Vergangenheit liegen', function (value) {
		if (value === '' || value === null) return true;
		const { date } = this.parent;
		const hours = parseInt(value.split(':')[0]);
		const minutes = parseInt(value.split(':')[1]);
		const time = new Date(date).setHours(hours, minutes);
		return time <= Date.now();
	});

export const addEventSchema = yup.object({
	title,
	date,
	time,
	contact,
	description
});

export const addEmailSchema = yup.object().shape({
	email
});

export const addCollectionSchema = yup.object().shape({
	title
});

export const updateCollectionSchema = addCollectionSchema;
export const updateEventSchema = yup.object().shape({
	title,
	contact,
	date,
	time,
	description
});
export const isUUID = (value) => yup.object().shape({ uuid }).isValidSync({ uuid: value });
export const isEmail = (value) => yup.object().shape({ email }).isValidSync({ email: value });
