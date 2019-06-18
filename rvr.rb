#!/usr/bin/env ruby

#TO GO PUBLIC, RUN:
# => rvr.rb -o 0.0.0.0 -p 4567 -env production

# Start loads

puts "RVR 0.3 - Guillem Carbonell - g@ubik.bz - 2019"
require 'sinatra'
require 'active_record'
require 'sqlite3'
require_relative 'blocks/db_helper'
require_relative 'blocks/db_models'

# Start setup

DataBaseHelper.setup

# --- Simple routes

get '/'  do
	erb :hello
end

get '/basic' do
	erb :basic
end

# --- Floating Messages: jQuery+SQLite for VR

get '/floating-messages' do
	erb :floating_messages
end

get '/floating-messages-sender' do
	erb :floating_messages_sender
end

post '/floating-messages' do
	Message.create(
		message: params['message'].to_s,
		author: params['author'].to_s,
		x: params['x'].to_i,
		y: params['y'].to_i,
		z: params['z'].to_i)
	erb :floating_messages_sender
end

get '/floating-messages-update' do
	if request.xhr? then
		%q{<a-box position="0 0 0"></a-box>
}
	else
		"<h1>That doesn't look like an Ajax request :(</h1>"
	end
end


