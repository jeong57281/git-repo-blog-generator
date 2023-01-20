const setPluginOptionsDynamically = (
  actions: any,
  store: any,
  pluginName: string,
  options: {}
) => {
  const state = store.getState();

  const { setPluginStatus } = actions;

  const plugin = state.flattenedPlugins.find(
    (plugin: any) => plugin.name === pluginName
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
