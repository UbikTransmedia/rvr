#!/usr/bin/env ruby
puts "RVR 0.1 - Guillem Carbonell - g@ubik.bz - 2019"
require 'sinatra'

get '/'  do
	erb :hello
end

get '/basic' do
	erb :basic
end