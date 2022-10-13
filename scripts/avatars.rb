# Get first command line arg
dir = ARGV[0]

prefix = <<EOF
const ANIMALIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-full w-full"
    style={{ overflow: "visible" }}
    viewBox="0 0 136 136"
    fill="none"
    role="img"
    aria-label="User Avatar: ANIMAL"
  >
EOF

suffix = <<EOF
  </svg>
)
EOF

files = {}

# Read all the svg files in directory and iterate over them
Dir.foreach(dir) do |file|
  # Skip the . and .. directories
  next if file == "." or file == ".." or !(file.include? ".svg")
  # Read the file
  content = File.read(dir + "/" + file)

  name = file.sub(".svg", "").sub("animal_", "").downcase
  files[name] = content.split("\n").select { |line| line.include? "<path" }.join("\n")
end

files.each do |name, content|
  puts prefix.gsub("ANIMAL", name.capitalize)
  puts content
  puts suffix
  puts "\n"
end

js = <<EOF
import React from 'react'

export const AnimalAvatar = ({ animal }) => {
  switch (animal) {
EOF

puts js

files.each do |name, content|
  puts "case '#{name}': return #{name.capitalize}Icon()"
end

js = <<EOF
    default: return null;
  }
}
EOF

puts js
