nix
{ pkgs }:

{
  packages = with pkgs; [
    nodejs_latest
    yarn
    nil # Nix language server
    nixpkgs-fmt # Nix code formatter
  ];

  # Set environment variables for Next.js development
  shellHook = ''
    export NODE_ENV="development"
    export NEXT_TELEMETRY_DISABLED=1
  '';
}