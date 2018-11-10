class StockPick < ApplicationRecord
  belongs_to :etf
  belongs_to :stock
end
