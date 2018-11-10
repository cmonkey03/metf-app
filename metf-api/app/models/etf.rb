class Etf < ApplicationRecord
  belongs_to :user
  has_many :stock_picks
  has_many :stocks, through: :stock_picks
end
