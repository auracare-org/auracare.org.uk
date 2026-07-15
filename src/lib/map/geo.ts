import { geoNaturalEarth1, geoPath, type GeoProjection } from 'd3-geo';
import { feature } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';

/**
 * Fixed internal coordinate space — the SVG scales responsively via viewBox,
 * while projected geometry (country paths + market points) stays consistent.
 */
export const MAP_W = 1000;
export const MAP_H = 500;
export const VIEWBOX = `0 0 ${MAP_W} ${MAP_H}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const topology = worldData as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const countriesFc = feature(topology, topology.objects.countries) as any;

const projection: GeoProjection = geoNaturalEarth1().fitExtent(
	[
		[8, 8],
		[MAP_W - 8, MAP_H - 8]
	],
	countriesFc
);

const pathGen = geoPath(projection);

export interface CountryPath {
	id: string;
	d: string;
}

/** All country outlines as SVG path data, precomputed once. */
export const countryPaths: CountryPath[] = countriesFc.features
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	.map((f: any, i: number) => ({
		id: f.id != null ? `country-${f.id}` : `country-i${i}`,
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
