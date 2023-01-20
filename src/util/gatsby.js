// @ts-check

/**
 *
 * @param {any} actions
 * @param {any} store
 * @param {string} pluginName
 * @param {Object} options
 */
const setPluginOptionsDynamically = (actions, store, pluginName, options) => {
  const state = store.getState();

  const { setPluginStatus } = actions;

  const plugin = state.flattenedPlugins.find(
    (plugin) => plugin.name === pluginName
  );

  if (plugin) {
    plugin.pluginOptions = {
      ...plugin.pluginOptions,
      ...options,
    };

    setPluginStatus({ pluginOptions: plugin.pluginOptions }, plugin);
  }
};

module.exports = {
  setPluginOptionsDynamically,
};
