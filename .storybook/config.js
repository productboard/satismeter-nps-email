import { configure } from '@storybook/html';

// automatically import all files from stories folder
configure(require.context('../stories', true, /\.ts$/), module);
