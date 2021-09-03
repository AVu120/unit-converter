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
      mg: "Miligram",
      μg: "Microgram",
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
        mg: [
          (num: number): number => num * 1000000000,
          (num: number): number => num / 1000000000,
        ],
        μg: [
          (num: number): number => num * 1000000000000,
          (num: number): number => num / 1000000000000,
        ],
      },
      kg: {
        g: [
          (num: number): number => num * 1000,
          (num: number): number => num / 1000,
        ],
        mg: [
          (num: number): number => num * 1000000,
          (num: number): number => num / 1000000,
        ],
        μg: [
          (num: number): number => num * 1000000000,
          (num: number): number => num / 1000000000,
        ],
      },
      g: {
        mg: [
          (num: number): number => num * 1000,
          (num: number): number => num / 1000,
        ],
        μg: [
          (num: number): number => num * 1000000,
          (num: number): number => num / 1000000,
        ],
      },
      mg: {
        μg: [
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
        mg: [
          "multiply the mass value by 1e+9",
          "divide the mass value by 1e+9",
        ],
        μg: [
          "multiply the mass value by 1e+12",
          "divide the mass value by 1e+12",
        ],
      },
      kg: {
        g: ["multiply the mass value by 1000", "divide the mass value by 1000"],
        mg: [
          "multiply the mass value by 1e+6",
          "divide the mass value by 1e+6",
        ],
        μg: [
          "multiply the mass value by 1e+9",
          "divide the mass value by 1e+9",
        ],
      },
      g: {
        mg: [
          "multiply the mass value by 1000",
          "divide the mass value by 1000",
        ],
        μg: [
          "multiply the mass value by 1e+6",
          "divide the mass value by 1e+6",
        ],
      },
      mg: {
        μg: [
          "multiply the mass value by 1000",
          "divide the mass value by 1000",
        ],
      },
    },
  },
  Time: {
    unitsToLabels: {
      wk: "Week",
      d: "Day",
      h: "Hour",
      m: "Minute",
      s: "Second",
    },
    conversionFunctions: {
      wk: {
        d: [(num: number): number => num * 7, (num: number): number => num / 7],
        h: [
          (num: number): number => num * 168,
          (num: number): number => num / 168,
        ],
        m: [
          (num: number): number => num * 10080,
          (num: number): number => num / 10080,
        ],
        s: [
          (num: number): number => num * 604800,
          (num: number): number => num / 604800,
        ],
      },
      d: {
        h: [
          (num: number): number => num * 24,
          (num: number): number => num / 24,
        ],
        m: [
          (num: number): number => num * 1440,
          (num: number): number => num / 1440,
        ],
        s: [
          (num: number): number => num * 86400,
          (num: number): number => num / 86400,
        ],
      },
      h: {
        m: [
          (num: number): number => num * 60,
          (num: number): number => num / 60,
        ],
        s: [
          (num: number): number => num * 3600,
          (num: number): number => num / 3600,
        ],
      },
      m: {
        s: [
          (num: number): number => num * 60,
          (num: number): number => num / 60,
        ],
      },
    },
    formulas: {
      wk: {
        d: ["multiply the time value by 7", "divide the time value by 7"],
        h: ["multiply the time value by 168", "divide the time value by 168"],
        m: [
          "multiply the time value by 10080",
          "divide the time value by 10080",
        ],
        s: [
          "multiply the time value by 604800",
          "divide the time value by 604800",
        ],
      },
      d: {
        h: ["multiply the time value by 24", "divide the time value by 24"],
        m: ["multiply the time value by 1440", "divide the time value by 1440"],
        s: [
          "multiply the time value by 86400",
          "divide the time value by 86400",
        ],
      },
      h: {
        m: ["multiply the time value by 60", "divide the time value by 60"],
        s: ["multiply the time value by 3600", "divide the time value by 3600"],
      },
      m: {
        s: ["multiply the time value by 60", "divide the time value by 60"],
      },
    },
  },
};
