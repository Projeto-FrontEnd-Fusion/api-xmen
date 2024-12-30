import type { CreateMemberDto, Member, UpdateMemberDto } from "@/api/member/memberModel";

export let members: Member[] = [
  {
    id: 1,
    name: "Alice",
    professional_profile_url: [
      { platform: "GitHub", url: "<https://github.com/johndoe>" },
      { platform: "LinkedIn", url: "<https://linkedin.com/in/johndoe>" },
    ],
    stack: "backend",
    community_level: "code wizard",
    current_squad: "X-mens",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Git", "Docker"],
    projects: [
      {
        project_cover: "https://project1.pg",
        project_name: "Personal Portfolio",
        description: "A personal portfolio website built with React and hosted on GitHub.",
        technologies_used: ["React", "CSS", "JavaScript"],
        project_url: "<https://github.com/johndoe/portfolio>",
      },
      {
        project_cover: "https://project1.pg",
        project_name: "E-commerce Website",
        description: "An online store platform with payment integration, built with Node.js and MongoDB.",
        technologies_used: ["Node.js", "Express", "MongoDB"],
        project_url: "<https://github.com/johndoe/ecommerce>",
      },
    ],
    softskills: ["Communication", "Problem-solving", "Teamwork", "Adaptability", "Time management"],
  },
  {
    id: 2,
    name: "Pedro",
    professional_profile_url: [
      { platform: "GitHub", url: "<https://github.com/johndoe>" },
      { platform: "LinkedIn", url: "<https://linkedin.com/in/johndoe>" },
    ],
    stack: "full-stack",
    community_level: "code wizard",
    current_squad: "marvels",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Git", "Docker", "Prisma", "NestJS"],
    projects: [
      {
        project_cover: "https://project1.pg",
        project_name: "Personal Portfolio",
        description: "A personal portfolio website built with React and hosted on GitHub.",
        technologies_used: ["React", "CSS", "JavaScript"],
        project_url: "<https://github.com/johndoe/portfolio>",
      },
      {
        project_cover: "https://project1.pg",
        project_name: "E-commerce Website",
        description: "An online store platform with payment integration, built with Node.js and MongoDB.",
        technologies_used: ["Node.js", "Express", "MongoDB"],
        project_url: "<https://github.com/johndoe/ecommerce>",
      },
    ],
    softskills: ["Communication", "Problem-solving", "Teamwork", "Adaptability", "Time management"],
  },
];

export class MemberRepository {
  async createAsync(memberToBeCreated: CreateMemberDto): Promise<Member> {
    const newMember: Member = {
      id: Date.now(),
      ...memberToBeCreated,
    };
    members.push(newMember);
    return newMember;
  }

  async findAllAsync(): Promise<Member[] | null> {
    return members;
  }

  async findByIdAsync(id: number): Promise<Member | null> {
    return members.find((member) => member.id === id) || null;
  }

  async updateAsync(id: number, newMemberData: UpdateMemberDto) {
    members = members.map((member) =>
      member.id === id ? { ...member, ...newMemberData, updatedAt: new Date() } : member,
    );
  }

  async deleteAsync(id: number) {
    members = members.filter((member) => member.id !== id);
  }
}
