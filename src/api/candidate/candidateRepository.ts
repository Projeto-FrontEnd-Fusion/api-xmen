import type { Candidate, CreateCandidateDto, UpdateCandidateDto } from "@/api/candidate/candidateModel";
import { query } from "@/common/database/databaseService";

export class CandidateRepository {
  async createAsync({ name, email, abilities, position, aboutMe }: CreateCandidateDto): Promise<Candidate> {
    const result = await query<Candidate>(
      `
      INSERT INTO candidates ("name", "email", "abilities", "position", "aboutMe")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [name, email, abilities, position, aboutMe],
    );
    return result[0];
  }

  async findAllAsync(): Promise<Candidate[] | undefined> {
    const result = await query<Candidate>(`SELECT * FROM candidates ORDER BY "id"`);
    return result;
  }

  async findByIdAsync(id: number): Promise<Candidate | undefined> {
    const result = await query<Candidate>(`SELECT * FROM candidates WHERE "id" = $1`, [id]);
    return result[0];
  }

  async updateAsync(id: number, { name, email, abilities, position, aboutMe }: UpdateCandidateDto) {
    await query<Candidate>(
      `
      UPDATE candidates
      SET "name" = $1, "email" = $2, "abilities" = $3, "position" = $4, "aboutMe" = $5, "updatedAt" = NOW()
      WHERE "id" = $6
      `,
      [name, email, abilities, position, aboutMe, id],
    );
  }

  async deleteAsync(id: number) {
    await query<Candidate>(`DELETE FROM candidates WHERE "id" = $1`, [id]);
  }
}
