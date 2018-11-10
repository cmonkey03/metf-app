# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_09_27_173638) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "etfs", force: :cascade do |t|
    t.integer "score"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_etfs_on_user_id"
  end

  create_table "stock_picks", force: :cascade do |t|
    t.float "initial_price"
    t.bigint "etf_id"
    t.bigint "stock_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["etf_id"], name: "index_stock_picks_on_etf_id"
    t.index ["stock_id"], name: "index_stock_picks_on_stock_id"
  end

  create_table "stocks", force: :cascade do |t|
    t.string "symbol"
    t.string "name"
    t.string "sector"
    t.string "industry"
    t.string "exchange"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "etfs", "users"
  add_foreign_key "stock_picks", "etfs"
  add_foreign_key "stock_picks", "stocks"
end
