import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypeCheck } from "@rsbuild/plugin-type-check";
import { pluginSass } from "@rsbuild/plugin-sass";
import { pluginSvgr } from '@rsbuild/plugin-svgr';

export default defineConfig({
	plugins: [
		pluginReact(), 
		pluginTypeCheck(),
		pluginSass(),
		pluginSvgr()
	], 
	server: {
		proxy: {
			"/api/v1/events": {
				"target": "https://localhost:7777",
				"ws": true,
				"secure": false,
			},
			"/api/v1": {
				"target": "https://localhost:7777",
				"secure": false,
			},
		}
	},
	html: {
		title: "Virola",
		favicon: "./src/assets/favicon.ico",
	},
});
