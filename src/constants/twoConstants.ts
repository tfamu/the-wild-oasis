export const TwoConstants = {
  QUERIES_KEY: {
    CABIN: "cabin",
    SETTING: "setting",
    BOOKING: "booking",
  },

  CABIN_SEARCH_OP: {
    ALL: { value: "all", label: "All" },
    NO_DISCOUNT: { value: "no-discount", label: "No Discount" },
    WITH_DISCOUNT: { value: "with-discount", label: "With Discount" },
  },

  CABIN_SORT_OP: {
    NAME_ASC: { value: "name-asc", label: "Sort by name (A-Z)" },
    NAME_DESC: { value: "name-desc", label: "Sort by name (Z-A)" },
    REG_PRICE_ASC: {
      value: "regularPrice-asc",
      label: "Sort by price (low first)",
    },
    REG_PRICE_DSC: {
      value: "regularPrice-desc",
      label: "Sort by price (high first)",
    },
    MAX_CAP_ASC: {
      value: "maxCapacity-asc",
      label: "Sort by capacity (low first)",
    },
    MAX_CAP_DSC: {
      value: "maxCapacity-desc",
      label: "Sort by capacity (high first)",
    },
  },
};