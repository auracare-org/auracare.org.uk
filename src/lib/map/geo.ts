import { geoNaturalEarth1, geoPath, type GeoProjection } from 'd3-geo';
import { feature } from 'topojson-client';
/* 110m, not 50m. The 50m atlas is 739KB of topojson that decoded into 1.4MB
   of SVG path data — every wave change and hover repainted all of it, and the
   whole file shipped in the page's JS. At a 1000px-wide frame the two are
   indistinguishable; the coastline detail 50m adds lives below one pixel.
   City-states the 110m atlas drops entirely (Hong Kong, Singapore) are drawn
   by the map as projected hub markers instead. */
import worldData from 'world-atlas/countries-110m.json';

/**
 * Fixed internal coordinate space: the SVG scales responsively via viewBox,
 * while projected geometry (country paths + market points) stays consistent.
 */
export const MAP_W = 1000;
/* Tuned to the projected height of the inhabited world at this width, so the
   viewBox is the map rather than the map plus a letterbox. At 500 the frame
   was ~13% taller than anything drawn in it. */
export const MAP_H = 453;
export const VIEWBOX = `0 0 ${MAP_W} ${MAP_H}`;
/** The frame's own proportion, for the CSS that sizes it. */
export const MAP_ASPECT = MAP_W / MAP_H;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const topology = worldData as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const countriesFc = feature(topology, topology.objects.countries) as any;

/**
 * Antarctica is excluded, from the fit and from the render both.
 *
 * It is a market for nobody and it is enormous in this projection: fitting the
 * full feature collection spent the bottom fifth of the frame on a landmass
 * drawn at "rest of world" opacity, which pushed every inhabited country into
 * the upper part of the box. The map was centred and looked as though it was
 * not. Dropping it re-centres the world people actually live in.
 */
const INHABITED = {
	...countriesFc,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	features: countriesFc.features.filter(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(f: any) => (f.properties && f.properties.name) !== 'Antarctica'
	)
};

const projection: GeoProjection = geoNaturalEarth1().fitExtent(
	[
		[8, 8],
		[MAP_W - 8, MAP_H - 8]
	],
	INHABITED
);

/* One decimal place is a tenth of a viewBox unit — a tenth of a pixel at the
   map's largest rendered size. The default three decimals tripled the length
   of every `d` string for precision nothing can see. */
const pathGen = geoPath(projection).digits(1);

export interface CountryPath {
	id: string;
	name: string;
	d: string;
}

/** All country outlines as SVG path data, precomputed once. */
export const countryPaths: CountryPath[] = INHABITED.features
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// Key by array index, always unique (some 50m features share an ISO id, e.g. 036).
	.map((f: any, i: number) => ({
		id: `country-${i}`,
		name: (f.properties && f.properties.name) || '',
		d: pathGen(f) ?? ''
	}))
	.filter((c: CountryPath) => c.d.length > 0);

/** Project [lon, lat] into the fixed map coordinate space. */
export function project(coords: [number, number]): [number, number] | null {
	const p = projection(coords);
	return p ? [p[0], p[1]] : null;
}

/** A quadratic-curve arc path between two lon/lat points, bowed upward. */
export function arcPath(from: [number, number], to: [number, number]): string | null {
	const a = project(from);
	const b = project(to);
	if (!a || !b) return null;
	const mx = (a[0] + b[0]) / 2;
	const my = (a[1] + b[1]) / 2;
	const dist = Math.hypot(b[0] - a[0], b[1] - a[1]);
	const lift = Math.min(90, dist * 0.4);
	return `M ${a[0]} ${a[1]} Q ${mx} ${my - lift} ${b[0]} ${b[1]}`;
}
