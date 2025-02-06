import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Player } from "src/players/players.entity";
import { Room } from "src/rooms/room.entity";

@Table({
    tableName: "votes",
    timestamps: true,
})
export class Vote extends Model <Vote>{
    @ForeignKey(() => Room)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
  
    })
    roomId!: number;
  
    @ForeignKey(() => Player)
    @Column({
        type: DataType.INTEGER, // STRING o'rniga INTEGER
        allowNull: false,
    })
    from!: number;
    
    @ForeignKey(() => Player)
    @Column({
        type: DataType.INTEGER, // STRING o'rniga INTEGER
        allowNull: false,
    })
    to!: number;
    

        @BelongsTo(() => Room)
        room!: Room;
      
        @BelongsTo(() => Player, { foreignKey: "from", as: "voter" }) // Ovoz beruvchi
        voter!: Player;
      
        @BelongsTo(() => Player, { foreignKey: "to", as: "voted" }) // Ovoz olayotgan
        voted!: Player;


}