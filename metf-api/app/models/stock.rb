class Stock < ApplicationRecord
  has_many :stock_picks
  has_many :etfs, through: :stock_picks
end
