import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import { candidateRegistry } from "@/api/candidate/candidateRouter";
import { healthCheckRegistry } from "@/api/healthCheck/healthCheckRouter";
import { memberRegistry } from "@/api/member/memberRouter";
import { projectRegistry } from "@/api/project/projectRouter";

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([healthCheckRegistry, candidateRegistry, memberRegistry, projectRegistry]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Swagger API",
    },
    externalDocs: {
      description: "View the raw OpenAPI Specification in JSON format",
      url: "/swagger.json",
    },
  });
}
