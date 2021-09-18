import _ from "lodash";

const BREAKPOINTS = {
  mobile: 320,
  mobileLandscape: 480,
  smallDesktop: 768,
  tablet: 856,
  tabletLandscape: 992,
  desktop: 1080,
  desktopLarge: 1500,
  desktopWide: 1920,
};

const SORT_DIRECTION = {
  ASC: "Ascending",
  DESC: "Descending"
};

const ROLE_NAMES = {
  // DOCK_SUPERVISOR: "Dock Supervisor",
  READ_ONLY: "Read Only",
  SYSADMIN: "System Admin"
};

const ROLE_IDS = {
  // DOCK_SUPERVISOR: 2,
  READ_ONLY: 3,
  SYSADMIN: 1
};

const ROLE_DICTIONARY = {
  // 2: ROLE_NAMES.DOCK_SUPERVISOR,
  3: ROLE_NAMES.READ_ONLY,
  1: ROLE_NAMES.SYSADMIN
};

const ALL_ROLES = [
  // { value: ROLE_IDS.DOCK_SUPERVISOR, label: ROLE_NAMES.DOCK_SUPERVISOR, groupName: 'Administration' },
  { value: ROLE_IDS.SYSADMIN, label: ROLE_NAMES.SYSADMIN, groupName: 'Administration' },
  { value: ROLE_IDS.READ_ONLY, label: ROLE_NAMES.READ_ONLY, groupName: 'Administration' }
];

const REFERENCE_DATA_URL_LIST = [
  // {
  //   maxNameLength: 100,
  //   elementName: "Building",
  //   pageTitle: "Buildings",
  //   toggleURL: 'admin/building/toggle_active',
  //   saveURL: 'admin/building',
  //   listURL: 'admin/buildings',
  //   reactPath: '/buildings',
  //   iconKey: 'warehouse',
  //   extraReadOnlyColumns: [{label: 'Effective Status Options', value: 'status_option_csv'}]
  // }
];

const MIME = {
	XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	CSV: 'text/csv',
	PDF: 'application/pdf',
	DEFAULT: 'application/octet-stream'
};

const constants = {
  TEN_SECONDS_MS: 10000,
  ONE_MINUTE_MS: 60000,
  FIVE_MINUTES_MS: 300000,
  TEN_MINUTES_MS: 600000,
  TWENTY_MINUTES_MS: 1200000,
  TWENTY_THREE_HOURS_MS: 82800000,
  FOUR_HOURS_MS: 14400000,
  SCREEN_NAMES: {
    ADMIN: "Administration"
  },
  BREAKPOINTS,
  SORT_DIRECTION,
  ROLE_NAMES,
  ROLE_IDS,
  ROLE_DICTIONARY,
  ALL_ROLES,
  MIME,
  REFERENCE_DATA_URL_LIST
};

export default constants;
