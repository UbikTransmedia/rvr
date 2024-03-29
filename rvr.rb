#!/usr/bin/env ruby

#TO GO PUBLIC, RUN:
# => rvr.rb -o 0.0.0.0 -p 4567 -env production

# Start loads

puts "RVR 0.5 - Guillem Carbonell - g@ubik.bz - 2019"
require 'sinatra'
require 'active_record'
require 'sqlite3'
require 'json'
require_relative 'blocks/db_helper'
require_relative 'blocks/db_models'
require_relative 'blocks/randos'

# Start setup

DataBaseHelper.setup



### EXPERIMENTS ###

# ---------------------------------------------------------------------- Simple routes

get '/'  do
	erb :hello
end

get '/basic' do
	erb :basic
end

# ---------------------------------------------------------------------- Holodeck Cargo Cult: jQuery+SQLite for VR

get '/holodeck' do
	erb :holodeck
end

get '/cargo-sender' do
	erb :cargo_sender
end

post '/cargo-sender' do
	Cargo.create(
		code: params['cargo'].to_s,
		active: true,
		author: params['author'].to_s)
	erb :cargo_sender
end

get '/true-all-cargos' do
	Cargo.all.each do |cargo|
		cargo.active = true
		cargo.save
	end
	erb :cargo_sender
end

get '/false-all-cargos' do
	Cargo.all.each do |cargo|
		cargo.active = false
		cargo.save
	end
	erb :cargo_sender
end

post '/cargos-update' do
	if request.xhr? then
		cargo_delivery = {'0'=>''}
		puts params.inspect

		#sanitize ---> to be fixed: when params == false, nil, etc. Review this.
		if params.class == FalseClass then params == {"IDs" => [0]} end
		if params["IDs"] == nil then params == {"IDs" => [0]} end

		puts params["IDs"].class
		puts params["IDs"].inspect

		unless params["IDs"] == nil || params["IDs"].empty? then
			params["IDs"].each do |client_id|
				puts client_id.class
				unless client_id == '0' then
					begin
						candidate_cargo = Cargo.find(client_id)
						if candidate_cargo && candidate_cargo.active == true then
							cargo_delivery[client_id] = ''						#CASE A: confirm symmetry client-DB: add the key, not the code
							puts "Cargo - already exists: #{client_id}"
						end
					rescue
						puts "Cargo - to be removed: #{client_id}"				#CASE B: confirm asymmetry client-DB; client will have to remove its ID: add nothing
					end
				end	
			end
		end

		Cargo.all.each do |cargo|
			begin
				if !(params["IDs"].include? cargo.id.to_s) && cargo.active == true then
					cargo_delivery[cargo.id] = cargo.code					#CASE C: confirm asymmetry DB-client; add the key, add the code
					puts "Cargo - to be added: #{cargo.id}"
				end
			rescue
				puts "Wrong cargo ID from server: #{cargo.id}"
			end
		end
																			# return Randos.test_cube
		puts ">>> Cargo delivery: #{cargo_delivery}"
		return cargo_delivery.to_json
	else
		"<h1>That doesn't look like an Ajax request :(</h1>"
	end
end


