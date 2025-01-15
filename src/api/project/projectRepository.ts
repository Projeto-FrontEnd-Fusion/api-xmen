import type { CreateProjectDto, Project, UpdateProjectDto } from "@/api/project/projectModel";

export let projects: Project[] = [
  {
    id: 1,
    project_cover: "https://project1.pg",
    project_name: "Personal Portfolio",
    description: "A personal portfolio website built with React and hosted on GitHub.",
    technologies_used: ["React", "CSS", "JavaScript"],
    project_url: "<https://github.com/johndoe/portfolio>",
  },
  {
    id: 2,
    project_cover: "https://project2.pg",
    project_name: "X-men",
    description: "A personal portfolio website built with React and hosted on GitHub.",
    technologies_used: ["Nestjs", "ORM", "Prisma"],
    project_url: "<https://github.com/johndoe/portfolio>",
  },
];

export class ProjectRepository {
  async createAsync(projectToBeCreated: CreateProjectDto): Promise<Project> {
    const newProject: Project = {
      id: Date.now(),
      ...projectToBeCreated,
    };
    projects.push(newProject);
    return newProject;
  }

  async findAllAsync(): Promise<Project[] | null> {
    return projects;
  }

  async findByIdAsync(id: number): Promise<Project | null> {
    return projects.find((project) => project.id === id) || null;
  }

  async updateAsync(id: number, newProjectData: UpdateProjectDto) {
    projects = projects.map((project) =>
      project.id === id ? { ...project, ...newProjectData, updateAt: new Date() } : project,
    );
  }

  async deleteAsync(id: number) {
    projects = projects.filter((project) => project.id !== id);
  }
}
