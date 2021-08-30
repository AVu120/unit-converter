const data: any = {
  Length: {
    unitsToLabels: {
      m: "Meter",
      cm: "Centimeter",
      mm: "MilliMeter",
      μm: "Micrometer",
    },
    conversionFunctions: {
      m: {
        cm: {
          leftToRight: (num: number): number => num * 100,
          rightToLeft: (num: number): number => num / 100,
        },
        mm: {
          leftToRight: (num: number): number => num * 1000,
          rightToLeft: (num: number): number => num / 1000,
        },
        μm: {
          leftToRight: (num: number): number => num * 1000000,
          rightToLeft: (num: number): number => num / 1000000,
        },
      },
    },
  },
  Mass: {
    unitsToLabels: {
      kg: "Kilogram",
      g: "Gram",
    },
    conversionFunctions: {
      kg: {
        g: {
          leftToRight: (num: number): number => num * 1000,
          rightToLeft: (num: number): number => num / 1000,
        },
      },
    },
  },
};

export default data;
