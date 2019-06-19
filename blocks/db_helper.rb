module DataBaseHelper

	def DataBaseHelper.setup
		if Pathname.new('persistence.db').file? then
			DataBaseHelper.connect
		else
			database = SQLite3::Database.new('persistence.db')
			DataBaseHelper.connect
			DataBaseHelper.build
		end
	end

	def DataBaseHelper.connect
		ActiveRecord::Base.logger = Logger.new(File.open('persistence.db.log', 'w'))
		ActiveRecord::Base.establish_connection(
			:adapter => 'sqlite3',
			:database => 'persistence.db',
			:timeout => 30000,
			:pool => 500
			)
		return true
	end

	def DataBaseHelper.build
		ActiveRecord::Schema.define do
			create_table :cargos do |t|
				t.column :code, :string
				t.column :active, :boolean
				t.column :author, :string
			end
		end
	end

end


