import * as de from 'apexcharts/dist/locales/de.json';
import { parseDate, parseTime } from '$lib/actions/datetime';
import { type EventRead, type EntityRead, EntityType } from '$lib/api/data-contracts';

export const getSeries = (persons: EntityRead[], events: EventRead[]) => {
	return persons.map((person) => {
		const acitivities = events.filter((event) =>
			event.entities.map((eventEntity) => eventEntity.id).includes(person.id)
		);
		return {
			name: person.name,
			data: acitivities.map((activity) => ({
				person,
				event: activity,
				x: activity.title,
				y: [new Date(activity.date).getTime(), new Date(activity.date).getTime()]
			}))
		};
	});
};
export const getAllPersons = (events: EventRead[]) =>
	events
		.flatMap((event) => event.entities.filter((entity) => entity.discriminator === 'PERSON'))
		.reduce((acc, value) => (acc.map((v) => v.id).includes(value.id) ? acc : [...acc, value]), []);

export const hasChartableEvents = (events: EventRead[]) =>
	events.some((event) =>
		event.entities.some((entity) => entity.discriminator === EntityType.PERSON)
	);

export type OnDatapointSelection = (currentEvent: EventRead) => void;
export type MakeTooltip = (
	currentEvent: EventRead,
	currentPerson: EntityRead,
	date: string,
	time: string | null
) => string;

export const makeChartOptions = (
	onDatapointSelection: OnDatapointSelection,
	makeTooltip: MakeTooltip
) => ({
	series: [],
	tooltip: {
		custom: function ({ seriesIndex, dataPointIndex, w }) {
			const { data } = w.config.series[seriesIndex];
			const event = data[dataPointIndex].event;
			const person = data[dataPointIndex].person;
			const date = parseDate(event.date);
			const time = parseTime(event.time);

			const tooltip = makeTooltip(event, person, date, time);
			return tooltip;
		}
	},
	chart: {
		toolbar: {
			show: true,
			offsetX: 0,
			offsetY: 0,
			tools: {
				download: false,
				selection: false,
				zoom: false,
				zoomin: true,
				reset: false,
				zoomout: true,
				pan: false
			}
		},
		locales: [de],
		defaultLocale: 'de',
		height: 450,
		type: 'rangeBar',
		events: {
			dataPointSelection: function (_, __, { seriesIndex, dataPointIndex, w }) {
				const { data } = w.config.series[seriesIndex];
				const event = data[dataPointIndex].event;
				onDatapointSelection(event);
			},
			dataPointMouseEnter: function (event) {
				event.path[0].style.cursor = 'pointer';
			}
		}
	},
	plotOptions: {
		bar: {
			horizontal: true,
			barHeight: '80%'
		}
	},
	xaxis: {
		type: 'datetime',
		labels: {
			datetimeFormatter: {
				year: 'yyyy',
				month: 'MMMM yyyy',
				day: 'd. M',
				hour: 'HH:mm'
			}
		}
	},
	stroke: {
		width: 10
	},

	fill: {
		type: 'solid',
		opacity: 0.6
	},
	legend: {
		position: 'top',
		horizontalAlign: 'left'
	}
});
