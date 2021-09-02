const data: any = {
  Length: {
    unitsToLabels: {
      m: "Meter",
      cm: "Centimeter",
      mm: "Millimeter",
      μm: "Micrometer",
    },
    conversionFunctions: {
      m: {
        cm: [
          (num: number): number => num * 100,
          (num: number): number => num / 100,
        ],
        mm: [
          (num: number): number => num * 1000,
          (num: number): number => num / 1000,
        ],
        μm: [
          (num: number): number => num * 1000000,
          (num: number): number => num / 1000000,
        ],
      },
      cm: {
        mm: [
          (num: number): number => num * 10,
          (num: number): number => num / 10,
        ],
        μm: [
          (num: number): number => num * 10000,
          (num: number): number => num / 10000,
        ],
      },
      mm: {
        μm: [
          (num: number): number => num * 1000,
          (num: number): number => num / 1000,
        ],
      },
    },
    formulas: {
      m: {
        cm: [
          "multiply the length value by 100",
          "divide the length value by 100",
        ],
        mm: [
          "multiply the length value by 1000",
          "divide the length value by 1000",
        ],
        μm: [
          "multiply the length value by 1e+6",
          "divide the length value by 1e+6",
        ],
      },
      cm: {
        mm: [
          "multiply the length value by 10",
          "divide the length value by 10",
        ],
        μm: [
          "multiply the length value by 10000",
          "divide the length value by 10000",
        ],
      },
      mm: {
        μm: [
          "multiply the length value by 1000",
          "divide the length value by 1000",
        ],
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
        g: [
          (num: number): number => num * 1000,
          (num: number): number => num / 1000,
        ],
      },
    },
    formulas: {
      kg: {
        g: ["multiply the mass value by 1000", "divide the mass value by 1000"],
      },
    },
  },
};

export default data;
