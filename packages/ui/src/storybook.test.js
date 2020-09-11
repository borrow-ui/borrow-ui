import initStoryshots, { multiSnapshotWithOptions } from '@storybook/addon-storyshots';

initStoryshots({
    storyKindRegex: /^((?!.*?Responsive).)*$/,
    test: multiSnapshotWithOptions({}),
});
