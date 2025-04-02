import sys

def main():
    # Get command line arguments
    args = sys.argv[1:]
    
    # Print something to stdout
    print(f"Hello from Python! Arguments received: {args}")
    
    # Return success
    return 0

if __name__ == "__main__":
    sys.exit(main())