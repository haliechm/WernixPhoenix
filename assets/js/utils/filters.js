import _ from "lodash";
import api from "./api";

const find_filter = (filterName, filters) =>
  _.find(filters, (x) => x.filterName === filterName);

const filterHelpers = {
  // gets a new filters array based on the new filter
  // being sent back to the page from the filter component
  getFilters(priorFilters, newFilter) {
    const filterIndex = priorFilters.findIndex(x => x.filterName === newFilter.filterName);
    let newFilters = priorFilters.slice();
    if (filterIndex === -1) {
      newFilters.push(newFilter);
    } else {
      newFilters[filterIndex] = newFilter;
    }
    newFilters = _.reject(newFilters, (x) => x.label === "Any");
    let returnValues = newFilters.filter((x) => {
      return x.value !== null ||
      (x.values && x.values.length && x.values.length > 0) ||
      x.startDate ||
      x.endDate
    }
    );
    return returnValues;
  },

  currentFilterValue(filters, name) {
    const filterElement = _.find(filters, (f) => f.filterName === name);
    if (filterElement) {
      if (filterElement.value) {
        return filterElement.value;
      }
      return filterElement.values;
    }
    return "";
  },

  transformFilters(filters = []) {
    return filters.reduce((acc, item, i) => {
      let itemValueToAdd;
      if (item.value === null || item.value === undefined) {
        //allow false to be passed
        if (item.values) {
          itemValueToAdd = item.values;
        }
      } else {
        itemValueToAdd = item.value;
      }
      //acc[item.filterName] = item.value || item.values;
      acc[item.filterName] = itemValueToAdd;
      return acc;
    }, {});
  },

  transformFiltersMultiToCSV(filters = []) {
    return filters.reduce((acc, item, i) => {
      acc[item.filterName] = item.value ? item.value : item.values.join(",");
      return acc;
    }, {});
  },

  saveSearch(area, sort_dir, sort_field, filters) {
    api
      .post("save_search", {
        area,
        serialized_search: {
          sort_field,
          sort_dir,
          filters,
        },
      })
      .catch((error) => error);
  },

  setSavedFilters(area, callBack) {
    api
      .fetch("get_saved_search", { area })
      .then((response) => {
        const search = response.data.serialized_search;
        callBack(search.sort_field, search.sort_dir, search.filters);
      })
      .catch((error) => error);
  },

  getValue(filterName, filters) {
    const filter = find_filter(filterName, filters);
    return filter ? filter.value : "";
  },

  getValues(filterName, filters) {
    const filter = find_filter(filterName, filters);
    return filter ? filter.values : [];
  },

  getStartDate(filterName, filters) {
    const filter = find_filter(filterName, filters);
    return filter ? filter.startDate : null;
  },

  getEndDate(filterName, filters) {
    const filter = find_filter(filterName, filters);
    return filter ? filter.endDate : null;
  },
};

export default filterHelpers;
