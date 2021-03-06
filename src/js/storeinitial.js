import { gasVizzyInit, delay } from "./gasvizzy";
import { logEvent } from "./fb";

import { tree, makeOwnerTreeData } from "./d3prep";

const _initial = {
  state: {
    gd: null,
    mf: null,
    // this'll get set to a proper value once the dom is loaded
    width: 100,
    hireableOwners: false,
    ownerFilter: [],
    libraryFilter: [],
    oauthScopeFilter: [],
    advancedServiceFilter: [],
    addOnFilter: [],
    runtimeVersionFilter: [],
    repoFilter: [],
    filterPlus: true,
    timeZoneFilter: [],
    webappFilter: [],
    dataStudioFilter: [],
    root: null,
    cacheTimestamp: null,
    making: false,
    showDetail: false,
    infoData: null,
    infoMoused: false,
    vizInfo: true,
    colors: {
      spinner: "amber accent-1",
      bigTree: null,
      smallTree: null,
      info: "pink",
    },
  },
  mutations: {
    setVizInfo(state, value) {
      state.vizInfo = value;
    },
    setInfoMoused(state, value) {
      state.infoMoused = value;
    },
    clearRoot(state) {
      state.root = null;
    },
    setRoot(state) {
      const data = makeOwnerTreeData(state);
      state.root = data ? tree({ data, width: state.width }) : null;
    },
    setMaking(state, value) {
      state.making = value;
    },
    setMf(state, mf) {
      state.mf = mf;
    },
    setGd(state, gd) {
      state.gd = gd;
    },
    setWidth(state, width) {
      state.width = width;
    },
    setCacheTimestamp(state, value) {
      state.cacheTimestamp = value;
    },
    setInfoData(state, value) {
      state.infoData = value;
    },
    _hireableOwners(state, value) {
      state.hireableOwners = value;
    },
    _ownerFilter(state, value) {
      state.ownerFilter = value;
    },
    _repoFilter(state, value) {
      state.repoFilter = value;
    },
    _timeZoneFilter(state, value) {
      state.timeZoneFilter = value;
    },
    _webappFilter(state, value) {
      state.webappFilter = value;
    },
    _dataStudioFilter(state, value) {
      state.dataStudioFilter = value;
    },
    _addOnFilter(state, value) {
      state.addOnFilter = value;
    },
    _oauthScopeFilter(state, value) {
      state.oauthScopeFilter = value;
    },
    _advancedServiceFilter(state, value) {
      state.advancedServiceFilter = value;
    },
    _libraryFilter(state, value) {
      state.libraryFilter = value;
    },
    _runtimeVersionFilter(state, value) {
      state.runtimeVersionFilter = value;
    },
    _showDetail(state, value) {
      state.showDetail = value;
    },
    _filterPlus(state, value) {
      state.filterPlus = value;
    },
  },
  actions: {
    vizzyInit({ commit, dispatch }) {
      commit("setMaking", true);
      return gasVizzyInit().then(({ gd, mf, timestamp }) => {
        commit("setGd", gd);
        commit("setMf", mf);
        commit("setCacheTimestamp", timestamp);
        dispatch("updateRoot");
      });
    },
    setHireableOwners({ dispatch, commit }, value) {
      commit("_hireableOwners", value);
      logEvent("filter", {
        name: "hireableOwners",
        value,
      });
      dispatch("updateRoot");
    },
    setOwnerFilter({ dispatch, commit }, value) {
      commit("_ownerFilter", value);
      logEvent("filter", {
        name: "owners",
        value,
      });
      dispatch("updateRoot");
    },
    setRepoFilter({ dispatch, commit }, value) {
      commit("_repoFilter", value);
      logEvent("filter", {
        name: "repos",
        value,
      });
      dispatch("updateRoot");
    },
    setTimeZoneFilter({ dispatch, commit }, value) {
      commit("_timeZoneFilter", value);
      logEvent("filter", {
        name: "timeZones",
        value,
      });
      dispatch("updateRoot");
    },
    setWebappFilter({ dispatch, commit }, value) {
      commit("_webappFilter", value);
      logEvent("filter", {
        name: "webapps",
        value,
      });
      dispatch("updateRoot");
    },
    setDataStudioFilter({ dispatch, commit }, value) {
      commit("_dataStudioFilter", value);
      logEvent("filter", {
        name: "dataStudios",
        value,
      });
      dispatch("updateRoot");
    },
    setAddOnFilter({ dispatch, commit }, value) {
      commit("_addOnFilter", value);
      logEvent("filter", {
        name: "addOns",
        value,
      });
      dispatch("updateRoot");
    },
    setOauthScopeFilter({ dispatch, commit }, value) {
      commit("_oauthScopeFilter", value);
      logEvent("filter", {
        name: "oauthScopes",
        value,
      });
      dispatch("updateRoot");
    },
    setAdvancedServiceFilter({ dispatch, commit }, value) {
      commit("_advancedServiceFilter", value);
      logEvent("filter", {
        name: "advancedServices",
        value,
      });
      dispatch("updateRoot");
    },
    setLibraryFilter({ dispatch, commit }, value) {
      commit("_libraryFilter", value);
      logEvent("filter", {
        name: "libraries",
        value,
      });
      dispatch("updateRoot");
    },
    setRuntimeVersionFilter({ dispatch, commit }, value) {
      commit("_runtimeVersionFilter", value);
      logEvent("filter", {
        name: "runtimeVersions",
        value,
      });
      dispatch("updateRoot");
    },

    flipShowDetail({ state, dispatch, commit }) {
      commit("_showDetail", !state.showDetail);
      logEvent("filter", {
        name: "showDetail",
        value: state.showDetail,
      });
      dispatch("updateRoot");
    },
    flipFilterPlus({ dispatch, state, commit }) {
      commit("_filterPlus", !state.filterPlus);
      logEvent("filter", {
        name: "filterPlus",
        value: state.filterPlus,
      });
      dispatch("updateRoot");
    },
    flipVizInfo({ state, commit }) {
      commit("setVizInfo", !state.vizInfo);
      logEvent("filter", {
        name: "vizInfo",
        value: state.vizInfo,
      });
    },
    updateRoot({ commit }, force) {
      // this allows re-render of whatever to show before waiting
      // for the length dom update
      if (force) {
        commit("clearRoot");
      }
      commit("setMaking", true);
      commit("setInfoMoused", false);

      return delay(1).then(() => {
        commit("setRoot");

      });
    },
  },
};

export default _initial;
