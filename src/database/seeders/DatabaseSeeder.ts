import { Seeder } from "../../../my_packages/seeder/Seeder";
import { Logger } from "../../app/helpers/logger";
import { UserModel } from "../../app/http/models/user.model";

class DatabaseSeeder extends Seeder {
  private user: UserModel;

  constructor() {
    super();
    this.user = new UserModel();
  }

  public async run(): Promise<void> {
    this.preCommand();
    const users = this.generateRandomUsers(100);
    try {
      for (const user of users) {
        await this.user.createData(user);
      }
      Logger.info("Migration successful");
      this.logExecutionTime();
    } catch (error: unknown) {
      Logger.error(`Migration failed: ${error}`);
      process.exit(1);
    }
  }

  // Method to generate random users
  private generateRandomUsers(
    count: number
  ): { name: string; email: string }[] {
    const users: { name: string; email: string }[] = [];
    const names = [
      "Yanto",
      "Suparman",
      "Matthews",
      "Andrew",
      "John",
      "Jane",
      "Alice",
      "Bob",
      "Charlie",
      "Dave",
    ];

    for (let i = 0; i < count; i++) {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomEmail = `${randomName.toLowerCase()}${Math.floor(
        Math.random() * 10000
      )}@mail.com`;
      users.push({ name: randomName, email: randomEmail });
    }

    return users;
  }
}

const seeder = new DatabaseSeeder();
seeder.run().catch((error) => {
  Logger.error(`Error running migration: ${error}`);
  process.exit(1);
});
