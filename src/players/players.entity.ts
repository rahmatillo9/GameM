import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Room } from "src/rooms/room.entity";

@Table({
    tableName: "players",
    timestamps: true,
})
export class Player extends Model <Player>{
    @ForeignKey(() => Room)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    roomId!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    role!: string;

    @Column({
        type: DataType.ENUM("alive", "dead"),
        allowNull: false,
        defaultValue: "alive",
    })
    status!: string;


  @BelongsTo(() => Room)
  room!: Room;
}