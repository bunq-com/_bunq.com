/* eslint-disable no-console */
import esbuild from 'esbuild';

const buildDirectory = 'dist';
const production = process.env.NODE_ENV === 'production';

// Config entrypoint files
const entryPoints = [
  'src/css/datepicker.css',
  'src/css/style.css',
  'src/js/datepicker.js',
  'src/js/eCookies.js',
  'src/js/event.js',
  'src/js/main.js',
  'src/js/mCookies.js',
  'src/js/overrider.js',
  'src/js/reportForm.js',
  'src/js/tooltip.js',
  'src/js/tabsCard.js',
  'src/js/blogSection.js',
];

/**
 * Default Settings
 * @type {esbuild.BuildOptions}
 */
const defaultSettings = {
  bundle: true,
  outdir: buildDirectory,
  minify: production,
  sourcemap: !production,
  target: production ? 'es2017' : 'esnext',
  entryPoints,
};

// Files building
if (production) {
  esbuild.build(defaultSettings);
}

// Files serving
else {
  esbuild
    .serve(
      {
        servedir: buildDirectory,
        port: 3000,
      },
      defaultSettings
    )
    .then((server) => {
      console.log(`Serving at http://localhost:${server.port}`);
    });
}
