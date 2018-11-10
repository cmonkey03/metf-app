class EtfsController < ApplicationController

  def index
    @etfs = Etf.all
    render json: @etfs
  end

  def show
    @etf = Etf.find(params[:id])
    render json: @etf
  end

  def create
    @etf = Etf.create(etf_params)
    if @etf.save
      render json: @etf, status: :accepted
    else
      render json: { errors: @etf.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def update
    @etf = Etf.find(params[:id])
    @etf.score = params[:etf][:score]
    if @etf.save
      render json: @etf, status: :accepted
    else
      render json: { errors: @etf.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def etf_params
    params.permit(:score, :user_id)
  end

end ##END OF CLASS
