export const defaultUnitType = "Length";

export const data: any = {
  Length: {
    unitsToLabels: {
      km: "Kilometer",
      m: "Meter",
      cm: "Centimeter",
      mm: "Millimeter",
      μm: "Micrometer",
    },
    conversionFunctions: {
      km: {
        m: [
          (num: number): number => num * 1000,
          (num: number): number => num / 1000,
        ],
        cm: [
          (num: number): number => num * 100000,
          (num: number): number => num / 100000,
        ],
        mm: [
          (num: number): number => num * 1000000,
          (num: number): number => num / 1000000,
        ],
        μm: [
          (num: number): number => num * 1000000000,
          (num: number): number => num / 1000000000,
        ],
      },
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
      km: {
        m: [
          "multiply the length value by 1000",
          "divide the length value by 1000",
        ],
        cm: [
          "multiply the length value by 100000",
          "divide the length value by 100000",
        ],
        mm: [
          "multiply the length value by 1e+6",
          "divide the length value by 1e+6",
        ],
        μm: [
          "multiply the length value by 1e+9",
          "divide the length value by 1e+9",
        ],
      },
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
      t: "Tonne",
      kg: "Kilogram",
      g: "Gram",
    },
    conversionFunctions: {
      t: {
        kg: [
          (num: number): number => num * 1000,
          (num: number): number => num / 1000,
        ],
        g: [
          (num: number): number => num * 1000000,
          (num: number): number => num / 1000000,
        ],
      },
      kg: {
        g: [
          (num: number): number => num * 1000,
          (num: number): number => num / 1000,
        ],
      },
    },
    formulas: {
      t: {
        kg: [
          "multiply the mass value by 1000",
          "divide the mass value by 1000",
        ],
        g: ["multiply the mass value by 1e+6", "divide the mass value by 1e+6"],
      },
      kg: {
        g: ["multiply the mass value by 1000", "divide the mass value by 1000"],
      },
    },
  },
};
