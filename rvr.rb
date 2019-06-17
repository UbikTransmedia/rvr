#!/usr/bin/env ruby

#TO GO PUBLIC, RUN:
# => rvr.rb -o 0.0.0.0 -p 4567 -env production

# Start loads

puts "RVR 0.3 - Guillem Carbonell - g@ubik.bz - 2019"
require 'sinatra'
require 'active_record'
require 'sqlite3'
require_relative 'modules/dbhelper'

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

post '/floating-messages' do
end

get '/floating-messages-sender' do
	erb :floating_messages_sender
end


# JQuery for Floating Messages
