class CreateStockPicks < ActiveRecord::Migration[5.2]
  def change
    create_table :stock_picks do |t|
      t.float :initial_price
      t.references :etf, foreign_key: true
      t.references :stock, foreign_key: true

      t.timestamps
    end
  end
end
