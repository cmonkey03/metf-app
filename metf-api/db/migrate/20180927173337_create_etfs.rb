class CreateEtfs < ActiveRecord::Migration[5.2]
  def change
    create_table :etfs do |t|
      t.integer :score
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
