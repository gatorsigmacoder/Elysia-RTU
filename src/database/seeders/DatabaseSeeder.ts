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
    try {
      const user1 = await this.user.createData({
        name: "yanto",
        email: "yanto@mail.com",
      });
      const user2 = await this.user.createData({
        name: "suparman",
        email: "parman@mail.com",
      });
      const user3 = await this.user.createData({
        name: "matthews",
        email: "mat@mail.com",
      });
      const user4 = await this.user.createData({
        name: "andrew",
        email: "andrew@mail.com",
      });
      Logger.info("Migration successful");
      this.logExecutionTime();
    } catch (error: unknown) {
      Logger.error(`Migration failed: ${error}`);
      process.exit(1);
    }
  }
}

const seeder = new DatabaseSeeder();
seeder.run().catch((error) => {
  Logger.error(`Error running migration: ${error}`);
  process.exit(1);
});
