import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Player } from "src/players/players.entity";
import { Vote } from "src/votes/votes.entity";

@Table({
    tableName: "rooms",
    timestamps: true,
})
export class Room extends Model <Room>{
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true, // Xona ID unikal bo‘lishi kerak
      })
      roomCode!: string;
   
    @Column({
    type: DataType.STRING,
    allowNull: false,
   })
    name!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    maxP!: number;

    @Column({
        type: DataType.ENUM("waiting", "playing", "finished"),
        allowNull: false,
        defaultValue: "waiting",
    })
    status!: string;


    @HasMany(() => Player)
    players!: Player[]

    @HasMany(() => Vote)
    votes!: Vote[]
}