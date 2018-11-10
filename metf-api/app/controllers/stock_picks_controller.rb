class StockPicksController < ApplicationController

  def index
    @stock_picks = StockPick.all
    render json: @stock_picks
  end

  def show
    @stock_pick = StockPick.find(params[:id])
    render json: @stock_pick
  end

  def create
    @stock_pick = StockPick.create(stock_pick_params)
    if @stock_pick.save
      render json: @stock_pick, status: :accepted
    else
      render json: { errors: @stock_pick.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def stock_pick_params
    params.permit(:initial_price, :etf_id, :stock_id)
  end

end ##END OF CLASS
