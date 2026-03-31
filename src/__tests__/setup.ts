// Test setup for medusa-custom-attributes-module
// Mock MedusaService and other dependencies

jest.mock('@medusajs/framework/utils', () => {
  const actual = jest.requireActual('@medusajs/framework/utils')
  return {
    ...actual,
    // MedusaService is a function that takes models and returns a class
    MedusaService: (models: any) => {
      return class MockMedusaService {
        models: any
        constructor() {
          this.models = models
        }

        // Mock methods that will be overridden in tests
        async listCategoryCustomAttributes() {
          return []
        }

        async createCategoryCustomAttributes() {
          return {}
        }

        async updateCategoryCustomAttributes() {
          return {}
        }

        async createProductCustomAttributes() {
          return {}
        }

        async updateProductCustomAttributes() {
          return {}
        }

        async listProductCustomAttributes() {
          return []
        }
      }
    },
    Module: jest.fn((name, config) => ({ name, config })),
    model: {
      define: jest.fn((name, config) => ({
        name,
        config,
        cascades: jest.fn((cascadesConfig) => ({
          name,
          config,
          cascades: cascadesConfig,
        })),
      })),
      id: () => ({
        primaryKey: () => ({ type: 'id', primaryKey: true }),
      }),
      text: () => ({
        default: (val: string) => ({ type: 'text', default: val }),
        nullable: () => ({ type: 'text', nullable: true }),
      }),
      number: () => ({
        default: (val: number) => ({ type: 'number', default: val }),
        nullable: () => ({ type: 'number', nullable: true }),
      }),
      boolean: () => ({
        default: (val: boolean) => ({ type: 'boolean', default: val }),
      }),
      belongsTo: () => ({ type: 'belongsTo' }),
      hasMany: () => ({ type: 'hasMany' }),
    },
  }
})