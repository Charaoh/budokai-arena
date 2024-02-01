# frozen_string_literal: true

# Ensure log directory exists
log_dir = File.expand_path('log', __dir__)
Dir.mkdir(log_dir) unless File.exist?(log_dir)

# Puma configuration
workers Integer(ENV['WEB_CONCURRENCY'] || 2)
threads_count = Integer(ENV['MAX_THREADS'] || 5)
threads threads_count, threads_count

preload_app!

rackup      BudokaiArena
port        ENV['PORT']     || 9292
environment ENV['RACK_ENV'] || 'development'

# Specify log file paths
stdout_redirect "#{log_dir}/puma.stdout.log", "#{log_dir}/puma.stderr.log", true

# On worker boot, you can add initialization for WebSocket here if needed
on_worker_boot do
  # Code to run when a worker boots up
end
