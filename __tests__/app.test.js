const request = require('supertest');
const app = require('../app');
const Joi = require('joi');
const schemas = require('../config/schemas')

describe('POST form-data to /api/search', () => {
  it('should accept form data', async () => {
    const response = await request(app).post("/api/search").field("query", "phone").field("page", "1")
      
      expect(response.status).toBe(200)

      const { error } = schemas.outputSchema.validate(response.body)
      expect(error).toBeUndefined()
  });

  it('should not accept invalid data: missing query', async () => {
    const response = await request(app).post("/api/search").field("page", "1")
    
    expect(response.status).toBe(400)
    
    const { error } = schemas.errorSchema.validate(response.body)
    expect(error).toBeUndefined()
  });

  it('should not accept invalid data: missing page', async () => {
    const response = await request(app).post("/api/search").field("query", "phone")
    
    expect(response.status).toBe(400)
    
    const { error } = schemas.errorSchema.validate(response.body)
    expect(error).toBeUndefined()
  });

  it('should not accept invalid data: wrong data type for page', async () => {
    const response = await request(app).post("/api/search").field("query", "phone").field("page", "one")
    
    expect(response.status).toBe(400)
    
    const { error } = schemas.errorSchema.validate(response.body)
    expect(error).toBeUndefined()
  });

  it('should not accept invalid data: unnecessary fields', async () => {
    const response = await request(app).post("/api/search").field("query", "phone").field("page", "1").field("price", "300")
    
    expect(response.status).toBe(400)
    
    const { error } = schemas.errorSchema.validate(response.body)
    expect(error).toBeUndefined()
  });

  it('should return XML', async () => {
    const response = await request(app).post("/api/search").set('Accept', 'application/xml').field("query", "phone").field("page", "1")
      
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch('application/xml');
  });
});

describe('POST json to /api/search', () => {
  it('should accept json data', async () => {
    const response = await request(app).post("/api/search").set('Content-Type', 'application/json').send({ "query": "phone", "page": 1 })
      
      expect(response.status).toBe(200)

      const { error } = schemas.outputSchema.validate(response.body)
      expect(error).toBeUndefined()
  });

  it('should not accept invalid data: missing query', async () => {
    const response = await request(app).post("/api/search").set('Content-Type', 'application/json').send({ "page": 1 })
    
    expect(response.status).toBe(400)
    
    const { error } = schemas.errorSchema.validate(response.body)
    expect(error).toBeUndefined()
  });

  it('should not accept invalid data: missing page', async () => {
    const response = await request(app).post("/api/search").set('Content-Type', 'application/json').send({ "page": 1 })
    
    expect(response.status).toBe(400)
    
    const { error } = schemas.errorSchema.validate(response.body)
    expect(error).toBeUndefined()
  });

  it('should not accept invalid data: wrong data type for page', async () => {
    const response = await request(app).post("/api/search").set('Content-Type', 'application/json').send({ "query": "phone", "page": "one" })
    
    expect(response.status).toBe(400)
    
    const { error } = schemas.errorSchema.validate(response.body)
    expect(error).toBeUndefined()
  });

  it('should not accept invalid data: unnecessary fields', async () => {
    const response = await request(app).post("/api/search").set('Content-Type', 'application/json').send({ "query": "phone", "page": 1, "price": 300 })
    
    expect(response.status).toBe(400)
    
    const { error } = schemas.errorSchema.validate(response.body)
    expect(error).toBeUndefined()
  });

  it('should return XML', async () => {
    const response = await request(app).post("/api/search").set('Accept', 'application/xml').set('Content-Type', 'application/json').send({ "query": "phone", "page": 1 })
      
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch('application/xml');
  });
});

describe('POST xml to /api/search', () => {
  it('should accept xml data', async () => {
    const response = await request(app).post("/api/search").set('Content-Type', 'application/xml').send("<body><query>phone</query><page>1</page></body>")
      
      expect(response.status).toBe(200)

      const { error } = schemas.outputSchema.validate(response.body)
      expect(error).toBeUndefined()
  });

  it('should not accept invalid data: missing query', async () => {
    const response = await request(app).post("/api/search").set('Content-Type', 'application/xml').send("<body><page>1</page></body>")
    
    expect(response.status).toBe(400)
    
    const { error } = schemas.errorSchema.validate(response.body)
    expect(error).toBeUndefined()
  });

  it('should not accept invalid data: missing page', async () => {
    const response = await request(app).post("/api/search").set('Content-Type', 'application/xml').send("<body><query>phone</query></body>")
    
    expect(response.status).toBe(400)
    
    const { error } = schemas.errorSchema.validate(response.body)
    expect(error).toBeUndefined()
  });

  it('should not accept invalid data: wrong data type for page', async () => {
    const response = await request(app).post("/api/search").set('Content-Type', 'application/xml').send("<body><query>phone</query><page>one</page></body>")
    
    expect(response.status).toBe(400)
    
    const { error } = schemas.errorSchema.validate(response.body)
    expect(error).toBeUndefined()
  });

  it('should not accept invalid data: unnecessary fields', async () => {
    const response = await request(app).post("/api/search").set('Content-Type', 'application/xml').send("<body><query>phone</query><page>1</page><price>300</price></body>")
    
    expect(response.status).toBe(400)
    
    const { error } = schemas.errorSchema.validate(response.body)
    expect(error).toBeUndefined()
  });

  it('should return XML', async () => {
    const response = await request(app).post("/api/search").set('Accept', 'application/xml').set('Content-Type', 'application/xml').send("<body><query>phone</query><page>1</page></body>")
      
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch('application/xml');
  });
});



