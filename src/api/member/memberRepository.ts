import type { CreateMemberDto, Member, UpdateMemberDto } from "@/api/member/memberModel";

export let members: Member[] = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    abilities: "Habilidade1, Habilidade2, Habilidade3",
    position: "Desenvolvedor Back End",
    aboutMe: "Pessoa habilidosa",
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    name: "Robert",
    email: "Robert@example.com",
    abilities: "Habilidade1, Habilidade2, Habilidade3",
    position: "Desenvolvedor Front End",
    aboutMe: "Pessoa habilidosa",
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  },
];

export class MemberRepository {
  async createAsync(memberToBeCreated: CreateMemberDto): Promise<Member> {
    const newMember: Member = {
      id: Date.now(),
      ...memberToBeCreated,
      createdAt: new Date(),
      updatedAt: new Date(),
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
