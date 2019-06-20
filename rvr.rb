#!/usr/bin/env ruby

#TO GO PUBLIC, RUN:
# => rvr.rb -o 0.0.0.0 -p 4567 -env production

# Start loads

puts "RVR 0.4 - Guillem Carbonell - g@ubik.bz - 2019"
require 'sinatra'
require 'active_record'
require 'sqlite3'
require 'json'
require_relative 'blocks/db_helper'
require_relative 'blocks/db_models'
require_relative 'blocks/randos'

# Start setup

DataBaseHelper.setup

# ---------------------------------------------------------------------- Simple routes

get '/'  do
	erb :hello
end

get '/basic' do
	erb :basic
end

# ---------------------------------------------------------------------- Holodeck Cargo Cult: jQuery+SQLite for VR

get '/cargos' do
	erb :cargos
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

post '/cargos-update' do
	if request.xhr? then
		cargo_delivery = {}
		puts params.inspect

		if params["IDs"] == nil then params["IDs"] == [] end

		unless params["IDs"] == nil || params["IDs"].empty? then
			params["IDs"].each do |client_id|
				begin
					if Cargo.find(client_id) then
						cargo_delivery[client_id] = ''						#CASE A: confirm symmetry client-DB: add the key, not the code
						puts "Cargo - already exists: #{client_id}"
					end
				rescue
					puts "Cargo - to be removed: #{client_id}"				#CASE B: confirm asymmetry client-DB; client will have to remove its ID: add nothing
				end		
			end
		end

		Cargo.all.each do |cargo|
			begin
				if !(params["IDs"].include? cargo.id.to_s) then
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


